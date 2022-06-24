import 'package:flutter/material.dart';
import 'package:get/get.dart';

class Guide extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(40),
      decoration: BoxDecoration(
        color: Get.theme.backgroundColor,
        borderRadius: BorderRadius.vertical(top: Radius.circular(30)),
      ),
      child: Column(
        children: [
          Container(
            child: Image.asset(
              "assets/images/pilih_tasbih.png",
              height: 120,
            ),
          ),
          SizedBox(height: 20),
          Text('Pilih tasbih ya...'),
          SizedBox(height: 20),
        ],
      ),
    );
  }
}
