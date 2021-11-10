import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../widgets/drawer_content.dart';
import '../widgets/guide.dart';
import '../widgets/tasbih_list.dart';
import '../widgets/text_editing_dialog.dart';

import '../controllers/tasbih_settings_controller.dart';
import '../controllers/tasbih_controller.dart';
import '../controllers/theme_controller.dart';

class HomeScreen extends StatelessWidget {
  final tasbihController = Get.find<TasbihController>(); // TODO: coba hapus
  final themeController = Get.find<ThemeController>();
  final tasbihSettingsController =
      Get.find<TasbihSettingsController>(); // TODO: coba hapus

  final textEditingController = TextEditingController(); // TODO: coba hapus
  final textFieldFocusNode = FocusNode(); // TODO: coba hapus

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: Drawer(child: DrawerContent()),
      body: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            /// Toolbar
            Container(
              padding: const EdgeInsets.only(top: 30, left: 30, right: 30),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(
                    children: [
                      Builder(builder: (context) {
                        return IconButton(
                          icon: Icon(Icons.menu),
                          padding: EdgeInsets.zero,
                          tooltip: 'Tampilkan opsi lanjut',
                          onPressed: () {
                            // Open drawer
                            Scaffold.of(context).openDrawer();
                          },
                        );
                      }),
                      Text('Pilih tasbihmu'),
                    ],
                  ),
                  IconButton(
                    icon: Icon(
                      Icons.add,
                    ),
                    padding: EdgeInsets.zero,
                    tooltip: 'Buat tasbih baru',
                    onPressed: () {
                      // Show dialog
                      TextEditingDialog.showTextEditingDialog(context: context);
                    },
                  ),
                ],
              ),
            ),

            SizedBox(height: 20),

            /// List of tasbih
            Expanded(
              child: TasbihList(),
            ),

            /// Guide
            GetBuilder<ThemeController>(builder: (context) {
              return Guide();
            }),
          ],
        ),
      ),
    );
  }
}
