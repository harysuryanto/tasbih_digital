import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../controllers/tasbih_settings_controller.dart';
import 'change_theme_button.dart';

class DrawerContent extends StatelessWidget {
  final tasbihSettingsController = Get.find<TasbihSettingsController>();

  @override
  Widget build(BuildContext context) {
    return ListView(
      children: [
        Padding(
          padding: const EdgeInsets.only(top: 20, left: 10),
          child: Text('Pengaturan'),
        ),

        /// Theme mode
        ListTile(
          leading: Icon(Icons.dark_mode_outlined),
          title: Text('Mode gelap'),
          trailing: ChangeThemeButton(),
        ),

        /// Only show on mobile platform
        if (GetPlatform.isMobile) ...[
          /// Long vibration at multiples of 33
          ListTile(
            leading: Icon(Icons.vibration_outlined),
            title: Text('Getar panjang setiap 33'),
            trailing: GetBuilder<TasbihSettingsController>(
              builder: (context) {
                return Switch.adaptive(
                  value: tasbihSettingsController.longVibrateEach33,
                  onChanged: (_) {
                    tasbihSettingsController.toggleLongVibrateEach33();
                  },
                );
              },
            ),
          ),

          /// Long vibration at 100
          ListTile(
            leading: Icon(Icons.vibration_outlined),
            title: Text('Getar panjang pada 100'),
            trailing: GetBuilder<TasbihSettingsController>(builder: (context) {
              return Switch.adaptive(
                value: tasbihSettingsController.longVibrateAt100,
                onChanged: (value) {
                  tasbihSettingsController.toggleLongVibrateAt100();
                },
              );
            }),
          ),
        ],
      ],
    );
  }
}
