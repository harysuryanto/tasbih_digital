import 'package:flutter/material.dart';

class MyThemes {
  static final lightTheme = ThemeData(
    scaffoldBackgroundColor: Colors.green,
    primaryColor: Colors.green,
    backgroundColor: Colors.white, // Background color for Guide section
    colorScheme: ColorScheme.light(),
  );

  static final darkTheme = ThemeData(
    scaffoldBackgroundColor: Colors.grey.shade900,
    primaryColor: Colors.grey.shade800,
    backgroundColor: Colors.grey.shade800, // Background color for Guide section
    colorScheme: ColorScheme.dark(),
  );
}
