import 'package:flutter/material.dart';
import 'package:get/route_manager.dart';
import 'package:get_storage/get_storage.dart';
import 'package:url_strategy/url_strategy.dart';

import 'package:tasbih_digital/screens/counter_screen.dart';
import 'package:tasbih_digital/screens/home_screen.dart';

void main() async {
  /// Remove hash (#) from url
  setPathUrlStrategy();

  /// Initialize storage
  await GetStorage.init();

  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      initialRoute: '/',
      getPages: [
        GetPage(name: '/', page: () => HomeScreen()),
        GetPage(
          name: '/counter',
          page: () => CounterScreen(),
          transition: Transition.cupertino,
        ),
      ],
      title: '✨ Tasbih Digital by Hary ✨',
      theme: ThemeData(
        primarySwatch: Colors.green,
        primaryColor: Colors.green,
      ),
      home: HomeScreen(),
    );
  }
}
