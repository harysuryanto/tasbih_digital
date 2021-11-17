import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../controllers/tasbih_controller.dart';
import '../widgets/counter.dart';

class CounterScreen extends StatelessWidget {
  final tasbihController = Get.find<TasbihController>();

  final index = int.parse(Get.parameters['index']!);
  final double resposiveWidth = Get.width > 768 ? 768 : Get.width;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Center(
          child: Container(
            width: resposiveWidth,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                /// Toolbar
                Container(
                  padding: const EdgeInsets.only(top: 30, left: 30, right: 30),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      IconButton(
                        padding: EdgeInsets.zero,
                        icon: Icon(Icons.arrow_back),
                        onPressed: () {
                          Get.back();
                        },
                      ),
                      SizedBox(height: 8),
                      Text(
                        tasbihController.tasbihs[index].name,
                        style: TextStyle(fontSize: 30),
                        overflow: TextOverflow.ellipsis,
                      ),
                    ],
                  ),
                ),

                SizedBox(height: 20),

                /// Counter section
                Expanded(
                  child: Counter(index: index),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
