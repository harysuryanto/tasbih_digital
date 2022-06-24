import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../controllers/theme_controller.dart';
import 'restart_widget.dart';

class ChangeThemeButton extends StatefulWidget {
  const ChangeThemeButton({Key? key}) : super(key: key);

  @override
  State<ChangeThemeButton> createState() => _ChangeThemeButtonState();
}

class _ChangeThemeButtonState extends State<ChangeThemeButton> {
  bool isProcessing = false;

  @override
  Widget build(BuildContext context) {
    final themeController = Get.find<ThemeController>();

    return GetBuilder<ThemeController>(
      builder: (_) {
        if (isProcessing) return CircularProgressIndicator.adaptive();

        return Switch.adaptive(
          value: Get.isDarkMode,
          onChanged: (value) {
            setState(() => isProcessing = !isProcessing);

            themeController.toggleTheme();

            Future.delayed(Duration(milliseconds: 1000)).then((value) {
              RestartWidget.restartApp(context);
              setState(() => isProcessing = !isProcessing);
            });
          },
        );
      },
    );
  }
}
