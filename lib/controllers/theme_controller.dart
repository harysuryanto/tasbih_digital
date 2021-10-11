import 'package:flutter/material.dart';
import 'package:flutter/scheduler.dart';
import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';

class ThemeController extends GetxController {
  ThemeMode themeMode = ThemeMode.system;

  @override
  void onInit() {
    var storedThemeModeString = GetStorage().read('themeMode');
    ThemeMode? storedThemeMode;

    // TODO: Convert String to ThemeMode and remove this if below
    if (storedThemeModeString == ThemeMode.system.toString()) {
      storedThemeMode = ThemeMode.system;
    } else if (storedThemeModeString == ThemeMode.light.toString()) {
      storedThemeMode = ThemeMode.light;
    } else {
      storedThemeMode = ThemeMode.dark;
    }

    if (storedThemeModeString != null) {
      themeMode = storedThemeMode;
    }
  }

  bool get isDarkMode {
    if (themeMode == ThemeMode.system) {
      final brightness = SchedulerBinding.instance!.window.platformBrightness;
      return brightness == Brightness.dark;
    } else {
      return themeMode == ThemeMode.dark;
    }
  }

  void toggleTheme() {
    print('Changing theme from $themeMode');
    themeMode = isDarkMode ? ThemeMode.light : ThemeMode.dark;

    /// Update the UI
    update();
    print('    to $themeMode');

    /// Save to database
    saveToDatabase('themeMode', themeMode.toString());
  }

  void saveToDatabase(String key, dynamic value) {
    print('Saving $key to database');
    GetStorage().write(key, value);
    print('Value of $key: ${GetStorage().read(key)}');
  }
}
