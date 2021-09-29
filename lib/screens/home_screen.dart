import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';
import 'package:tasbih_digital/controllers/tasbih_controller.dart';
import 'package:tasbih_digital/models/tasbih_model.dart';

class HomeScreen extends StatelessWidget {
  final tasbihController = Get.put(TasbihController());

  @override
  Widget build(BuildContext context) {
    var textEditingController = TextEditingController();

    return Scaffold(
      backgroundColor: Theme.of(context).primaryColor,
      body: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // * Toolbar
            Container(
              padding: const EdgeInsets.only(top: 30, left: 30, right: 30),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text('Pilih tasbihmu', style: TextStyle(color: Colors.white)),
                  IconButton(
                    icon: Icon(
                      Icons.add,
                      color: Colors.white,
                    ),
                    tooltip: 'Buat tasbih baru',
                    onPressed: () {
                      showDialog(
                        context: context,
                        builder: (context) {
                          return AlertDialog(
                            title: Text('Tambah tasbih'),
                            content: TextField(
                              controller: textEditingController,
                              autofocus: true,
                              decoration: InputDecoration(
                                  labelText: 'Tulis nama tasbih...'),
                            ),
                            actions: <Widget>[
                              TextButton(
                                child: const Text(
                                  'Simpan',
                                ),
                                onPressed: () {
                                  tasbihController.tasbihs.add(
                                      Tasbih(name: textEditingController.text));
                                  textEditingController.clear();
                                  Get.back();
                                },
                              ),
                            ],
                            elevation: 24,
                          );
                        },
                      );
                    },
                  ),
                ],
              ),
            ),

            SizedBox(height: 20),

            // * List of tasbih
            Expanded(
              child: Obx(
                () => ListView.separated(
                  physics: BouncingScrollPhysics(),
                  padding: EdgeInsets.fromLTRB(30, 0, 30, 30),
                  itemCount: tasbihController.tasbihs.length,
                  separatorBuilder: (context, index) => SizedBox(height: 15),
                  itemBuilder: (context, index) {
                    /// Formatting the date
                    DateTime originalUpdatedAt = DateTime.parse(
                        tasbihController.tasbihs[index].updatedAt);
                    final DateFormat formatter = DateFormat('dd-MM-yyyy');
                    final String formattedUpdatedAt =
                        formatter.format(originalUpdatedAt);

                    return Dismissible(
                      key: UniqueKey(),
                      background: Row(
                        mainAxisAlignment: MainAxisAlignment.start,
                        children: [Icon(Icons.delete_outline_rounded)],
                      ),
                      secondaryBackground: Row(
                        mainAxisAlignment: MainAxisAlignment.end,
                        children: [Icon(Icons.delete_outline_rounded)],
                      ),
                      direction: DismissDirection.endToStart,
                      onDismissed: (_) {
                        var removed = tasbihController.tasbihs[index];
                        tasbihController.tasbihs.removeAt(index);
                        Get.snackbar(
                          '${removed.name} dihapus',
                          'Tekan Urungkan untuk mengembalikan.',
                          mainButton: TextButton(
                            child: Text(
                              'Urungkan',
                              style: TextStyle(color: Colors.black),
                            ),
                            onPressed: () {
                              if (removed == null) {
                                return;
                              }
                              tasbihController.tasbihs.insert(index, removed);
                              removed = null;
                              if (Get.isSnackbarOpen!) {
                                Get.back();
                              }
                            },
                          ),
                        );
                      },
                      child: Container(
                        decoration: BoxDecoration(
                          color: Colors.white,
                          borderRadius: BorderRadius.all(Radius.circular(20)),
                        ),
                        child: ListTile(
                          title: Text(tasbihController.tasbihs[index].name),
                          subtitle: Text(
                            'Digunakan pada $formattedUpdatedAt',
                          ),
                          trailing: Container(
                            height: 35,
                            width: 35, // It shows max of 3 digits number
                            padding: EdgeInsets.all(2),
                            alignment: Alignment.center,
                            decoration: BoxDecoration(
                              color: Theme.of(context).primaryColor,
                              borderRadius:
                                  BorderRadius.all(Radius.circular(20)),
                            ),
                            child: Text(
                              '${tasbihController.tasbihs[index].count}',
                              style: TextStyle(
                                color: Colors.white,
                                overflow: TextOverflow.ellipsis,
                              ),
                            ),
                          ),
                          onTap: () {
                            Get.toNamed('/counter?index=' + index.toString());
                          },
                          onLongPress: () {
                            Fluttertoast.showToast(
                              msg: "Geser ke kiri untuk menghapus",
                              toastLength: Toast.LENGTH_LONG,
                              webPosition: 'center',
                              webBgColor: '#000',
                              timeInSecForIosWeb: 3,
                            );
                          },
                        ),
                      ),
                    );
                  },
                ),
              ),
            ),

            // * Guide
            Container(
              padding: EdgeInsets.all(40),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.only(
                  topLeft: Radius.circular(30),
                ),
              ),
              child: Column(
                children: [
                  Container(
                    child: Image.asset(
                      "assets/images/pilih_tasbih.png",
                      height: 120,
                    ),
                  ),
                  SizedBox(height: 20),
                  Text('Pilih tasbih ya...'),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
