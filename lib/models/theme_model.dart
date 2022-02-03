import 'package:flex_color_scheme/flex_color_scheme.dart';
import 'package:flutter/material.dart';

class MyThemes {
  static final lightTheme =
      FlexThemeData.light(scheme: FlexScheme.green).copyWith(
    scaffoldBackgroundColor: Colors.green,
  );

  static final darkTheme =
      FlexThemeData.dark(scheme: FlexScheme.green).copyWith(
    backgroundColor: Colors.grey.shade900,
    dialogBackgroundColor: Colors.grey.shade900,
    drawerTheme: DrawerThemeData(backgroundColor: Colors.grey.shade900),
  );
}
