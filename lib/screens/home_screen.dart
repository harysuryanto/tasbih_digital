import 'package:flutter/material.dart';
import 'package:flutter_swipe_action_cell/core/cell.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';
import 'package:tasbih_digital/controllers/tasbih_controller.dart';

class HomeScreen extends StatelessWidget {
  final tasbihController = Get.put(TasbihController());
  final textEditingController = TextEditingController();
  final textFieldFocusNode = FocusNode();

  @override
  Widget build(BuildContext context) {
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
                    padding: EdgeInsets.zero,
                    tooltip: 'Buat tasbih baru',
                    onPressed: () {
                      /// Show dialog
                      _showTextEditingDialog(context: context);
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
                    return SwipeActionCell(
                      key: UniqueKey(),
                      backgroundColor: Colors.transparent,
                      performsFirstActionWithFullSwipe: false,
                      deleteAnimationDuration: 400,
                      trailingActions: <SwipeAction>[
                        SwipeAction(
                          icon: Icon(Icons.edit),
                          color: Colors.transparent,
                          onTap: (CompletionHandler handler) async {
                            /// Show dialog
                            _showTextEditingDialog(
                              context: context,
                              indexToEdit: index, // Should not be a String
                            );

                            /// Move the list tile back to original position
                            handler(false);
                          },
                        ),
                        SwipeAction(
                          icon: Icon(Icons.delete),
                          color: Colors.transparent,
                          onTap: (CompletionHandler handler) async {
                            /// Vibrate
                            Feedback.forLongPress(context);

                            /// Remove item from ListView
                            await handler(true);

                            /// Remove data from database
                            _removeItem(index);
                          },
                        ),
                      ],
                      child:
                          // ListTile
                          _buildItem(tasbihController.tasbihs[index], index),
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

  Widget _buildItem(var item, int index) {
    /// Formatting the date
    DateTime originalUpdatedAt =
        DateTime.parse(tasbihController.tasbihs[index].updatedAt);
    final DateFormat formatter = DateFormat('dd-MM-yyyy');
    final String formattedUpdatedAt = formatter.format(originalUpdatedAt);

    return Container(
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
            color: Colors.green,
            borderRadius: BorderRadius.all(Radius.circular(20)),
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
    );
  }

  void _removeItem(int index) {
    var removed = tasbihController.tasbihs[index];

    /// Remove data from database
    tasbihController.remove(index);

    Get.snackbar(
      '${removed.name} dihapus',
      'Tekan Urungkan untuk mengembalikan.',
      backgroundColor: Colors.white,
      boxShadows: [
        BoxShadow(
          offset: Offset(0, 3),
          blurRadius: 20,
          color: Colors.black26,
        ),
      ],
      mainButton: TextButton(
        child: Text(
          'Urungkan',
          style: TextStyle(color: Colors.black),
        ),
        onPressed: () {
          if (removed == null) {
            return;
          }

          /// Reinsert the removed data to database
          tasbihController.tasbihs.insert(index, removed);
          print('[DATABASE] undo the delete');

          removed = null;
          if (Get.isSnackbarOpen!) {
            Get.back();
          }
        },
      ),
    );
  }

  void _showTextEditingDialog({
    required BuildContext context,
    int? indexToEdit,
  }) {
    final bool isEditMode = indexToEdit != null ? true : false;

    /// Fill text field with current tasbih name if [isEditMode] is [true]
    textEditingController.text =
        isEditMode ? tasbihController.tasbihs[indexToEdit].name : '';

    final onSubmit = () {
      /// Tell user to fill the text field if it is is empty
      if (textEditingController.text.isEmpty) {
        textFieldFocusNode.requestFocus();
        Fluttertoast.showToast(
          msg: 'Nama tidak boleh kosong',
          toastLength: Toast.LENGTH_LONG,
          webPosition: 'center',
          webBgColor: '#000',
          timeInSecForIosWeb: 3,
        );
      } else {
        if (isEditMode) {
          /// Update the selected data in database
          tasbihController.rename(indexToEdit, textEditingController.text);
        } else {
          /// Insert data to database
          tasbihController.insert(textEditingController.text);
        }
        Get.back();
        textEditingController.clear();
      }
    };

    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text(isEditMode ? 'Ubah nama tasbih' : 'Tambah tasbih'),
          content: TextField(
            controller: textEditingController,
            autofocus: true,
            focusNode: textFieldFocusNode,
            onSubmitted: (value) => onSubmit,
            decoration: InputDecoration(
              labelText: 'Tulis nama tasbih...',
            ),
          ),
          actions: <Widget>[
            TextButton(
              child: const Text(
                'Simpan',
              ),
              onPressed: onSubmit,
            ),
          ],
          elevation: 24,
        );
      },
    );
  }
}
