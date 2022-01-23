import 'package:flutter/material.dart';
import 'package:get/get_navigation/src/extension_navigation.dart';
import 'package:get/state_manager.dart';
import 'package:get_storage/get_storage.dart';

class ThemeController extends GetxController {
  /// Default theme
  ThemeMode themeMode = ThemeMode.light;

  @override
  void onInit() {
    var storedThemeModeString = GetStorage().read('themeMode');
    ThemeMode? storedThemeMode;

    print('a) isi ThemeMode di DB: ${GetStorage().read('themeMode')}');

    /// Can not save [ThemeMode.attributeName] to database,
    /// so below are convertion between ThemeMode and String.
    if (storedThemeModeString == ThemeMode.system.toString()) {
      storedThemeMode = ThemeMode.system;
    } else if (storedThemeModeString == ThemeMode.light.toString()) {
      storedThemeMode = ThemeMode.light;
    } else if (storedThemeModeString == ThemeMode.dark.toString()) {
      storedThemeMode = ThemeMode.dark;
    }

    if (storedThemeModeString != null) {
      /// Take from database if theme mode already exists in database
      themeMode = storedThemeMode!;
      print('Theme mode exists in database');
    } else {
      print(
          'Theme mode doesn\'t exist in database. Set it to $themeMode as default.');

      /// Set default theme and save to database if theme mode doesn't exist in database
      saveToDatabase('themeMode', themeMode.toString());
    }

    print('[1] ThemeController - onInit()');
    print('b) isi ThemeMode di DB: $storedThemeMode');

    super.onInit();
  }

  void toggleTheme() {
    print('Changing theme \n    from $themeMode');
    themeMode = Get.isDarkMode ? ThemeMode.light : ThemeMode.dark;

    /// Update the UI
    update();
    print('    to   $themeMode');

    /// Save to database
    saveToDatabase('themeMode', themeMode.toString());
  }

  void saveToDatabase(String key, dynamic value) {
    print('Saving $key to database');
    GetStorage().write(key, value);
    print('Value of $key: ${GetStorage().read(key)}');
  }
}
