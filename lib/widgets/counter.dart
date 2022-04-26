import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_vibrate/flutter_vibrate.dart';
import 'package:get/get_core/src/get_main.dart';
import 'package:get/get_instance/src/extension_instance.dart';
import 'package:get/get_navigation/src/extension_navigation.dart';
import 'package:get/get_state_manager/src/rx_flutter/rx_obx_widget.dart';
import 'package:get/get_utils/src/platform/platform.dart';

import '../controllers/tasbih_controller.dart';
import '../controllers/tasbih_settings_controller.dart';

class Counter extends StatelessWidget {
  final int index;

  final tasbihController = Get.find<TasbihController>();
  final tasbihSettingsController = Get.find<TasbihSettingsController>();

  Counter({required this.index});

  @override
  Widget build(BuildContext context) {
    final screenHeight = MediaQuery.of(context).size.height;
    print('Screen height: $screenHeight');

    return Container(
      decoration: BoxDecoration(
        color: Get.theme.backgroundColor,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(30)),
      ),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          /// Counter text
          Obx(
            () => Text(
              '${tasbihController.tasbihs[index].count.toString()}',
              style: TextStyle(
                fontSize: screenHeight <= 640
                    ? 80 // 16x9 screen
                    : 100, // Narrow screen
              ),
            ),
          ),

          /// Reset counter button
          Obx(() {
            return Visibility(
              visible: tasbihController.tasbihs[index].count > 0,
              maintainState: true,
              maintainSize: true,
              maintainAnimation: true,
              child: Material(
                color: Colors.transparent,
                child: IconButton(
                  icon: const Icon(Icons.restart_alt),
                  iconSize: 30,
                  splashRadius: 24,
                  padding: EdgeInsets.zero,
                  tooltip: 'Atur ulang',
                  onPressed: () => _resetCounter(),
                ),
              ),
            );
          }),

          /// Increment and decrement buttons
          Material(
            color: Colors.transparent,
            child: IconButton(
              icon: const Icon(Icons.arrow_drop_up),
              iconSize: 180,
              splashRadius: 180 / 2, // = (iconSize / 2)
              padding: const EdgeInsets.all(0),
              onPressed: () => _incrementCounter(),
            ),
          ),
          Obx(() {
            return Visibility(
              visible: tasbihController.tasbihs[index].count > 0,
              maintainState: true,
              maintainSize: true,
              maintainAnimation: true,
              child: Material(
                color: Colors.transparent,
                child: InkWell(
                  borderRadius: BorderRadius.all(Radius.circular(50)),
                  child: Icon(Icons.arrow_drop_down, size: 80),
                  onTap: () => _decrementCounter(),
                ),
              ),
            );
          }),
        ],
      ),
    );
  }

  void _incrementCounter() {
    tasbihController.increment(index);

    /// Vibrate
    if (tasbihController.tasbihs[index].count % 33 == 0 &&
        tasbihSettingsController.longVibrateEach33) {
      if (GetPlatform.isMobile || (GetPlatform.isMobile && GetPlatform.isWeb)) {
        Vibrate.vibrate();
        print('long vibration each 33');
      }
    } else if (tasbihController.tasbihs[index].count % 100 == 0 &&
        tasbihSettingsController.longVibrateEach100) {
      if (GetPlatform.isMobile || (GetPlatform.isMobile && GetPlatform.isWeb)) {
        Vibrate.vibrate();
        print('long vibration each 100');
      }
    } else {
      HapticFeedback.vibrate();
    }
  }

  void _decrementCounter() {
    tasbihController.decrement(index);

    /// Vibrate
    HapticFeedback.vibrate();
  }

  void _resetCounter() {
    /// Backup the count before resetting
    var countString = tasbihController.tasbihs[index].count.toString();
    var updatedAtString = tasbihController.tasbihs[index].updatedAt.toString();

    /// Reset the count
    tasbihController.reset(index);

    /// Vibrate
    HapticFeedback.vibrate();

    /// Show notification
    Get.snackbar(
      'Tasbih direset',
      'Penghitung dikembalikan ke 0',
      boxShadows: [
        BoxShadow(
          offset: Offset(0, 3),
          blurRadius: 20,
          color: Colors.black26,
        ),
      ],
      mainButton: TextButton(
        child: Text('Urungkan'),
        onPressed: () {
          var isUndoDone = false;
          if (isUndoDone) {
            return;
          }
          var newUpdatedAt = tasbihController.tasbihs[index];
          newUpdatedAt.count = int.parse(countString);
          newUpdatedAt.updatedAt = updatedAtString;
          tasbihController.tasbihs[index] = newUpdatedAt;
          isUndoDone = true;
          print('[DATABASE] undo the reset');
          if (Get.isSnackbarOpen!) {
            Get.back();
          }
        },
      ),
    );

    /// Vibrate
    HapticFeedback.mediumImpact();
  }
}
