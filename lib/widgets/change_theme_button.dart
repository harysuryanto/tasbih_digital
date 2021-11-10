import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../controllers/theme_controller.dart';

class ChangeThemeButton extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final themeController = Get.find<ThemeController>();

    return GetBuilder<ThemeController>(
      builder: (context) {
        return Switch.adaptive(
          value: Get.isDarkMode,
          onChanged: (value) {
            themeController.toggleTheme();
          },
        );
      },
    );
  }
}
