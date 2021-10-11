import 'package:flutter/material.dart';
import 'package:flutter_vibrate/flutter_vibrate.dart';
import 'package:get/get.dart';

import '../controllers/settings_controller.dart';
import '../controllers/tasbih_controller.dart';

class CounterScreen extends StatelessWidget {
  final tasbihController = Get.find<TasbihController>();
  final settingsController = Get.find<SettingsController>();
  final index = int.parse(Get.parameters['index']!);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            // * Toolbar
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
                    'Kamu memilih',
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

            // * Counter
            Expanded(
              child: Container(
                padding: EdgeInsets.only(top: 40, bottom: 100),
                decoration: BoxDecoration(
                  color: Get.theme
                      .backgroundColor, // Expect: white (light) / grey (dark)
                  borderRadius: BorderRadius.only(
                    topLeft: Radius.circular(30),
                  ),
                ),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    // * Top section
                    Column(
                      children: [
                        Obx(
                          () => Text(
                            '${tasbihController.tasbihs[index].count.toString()}',
                            style: TextStyle(fontSize: 100),
                          ),
                        ),
                        Material(
                          color: Colors.transparent,
                          child: IconButton(
                            icon: Icon(Icons.restart_alt),
                            iconSize: 30,
                            splashRadius: 24,
                            padding: EdgeInsets.zero,
                            tooltip: 'Atur ulang',
                            onPressed: () {
                              /// Backup the count before resetting
                              var countString = tasbihController
                                  .tasbihs[index].count
                                  .toString();
                              var updatedAtString = tasbihController
                                  .tasbihs[index].updatedAt
                                  .toString();

                              /// Reset the count
                              tasbihController.reset(index);

                              /// Vibrate
                              Vibrate.feedback(FeedbackType.medium);

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
                                  child: Text(
                                    'Urungkan',
                                  ),
                                  onPressed: () {
                                    var isUndoDone = false;
                                    if (isUndoDone) {
                                      return;
                                    }
                                    var newUpdatedAt =
                                        tasbihController.tasbihs[index];
                                    newUpdatedAt.count = int.parse(countString);
                                    newUpdatedAt.updatedAt = updatedAtString;
                                    tasbihController.tasbihs[index] =
                                        newUpdatedAt;
                                    isUndoDone = true;
                                    print('[DATABASE] undo the reset');
                                    if (Get.isSnackbarOpen!) {
                                      Get.back();
                                    }
                                  },
                                ),
                              );

                              /// Vibrate
                              Feedback.forLongPress(context);
                            },
                          ),
                        ),
                      ],
                    ),

                    // * Counter section
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        Material(
                          color: Colors.transparent,
                          child: IconButton(
                            icon: Icon(
                              Icons.arrow_drop_up,
                              size: 140,
                            ),
                            iconSize: 180,
                            splashRadius: 90,
                            padding: EdgeInsets.all(0),
                            onPressed: () {
                              tasbihController.increment(index);

                              /// Vibrate
                              if (tasbihController.tasbihs[index].count % 33 ==
                                      0 &&
                                  settingsController.longVibrateEach33) {
                                Vibrate.vibrate();
                                print('looooooooong vibration (33)');
                              } else if (tasbihController
                                          .tasbihs[index].count ==
                                      100 &&
                                  settingsController.longVibrateAt100) {
                                Vibrate.vibrate();
                                print('looooooooong vibration (100)');
                              } else {
                                Vibrate.feedback(FeedbackType.medium);
                              }
                            },
                          ),
                        ),
                        Material(
                          color: Colors.transparent,
                          child: IconButton(
                            icon: Icon(Icons.arrow_drop_down),
                            iconSize: 60,
                            splashRadius: 30,
                            padding: EdgeInsets.all(0),
                            onPressed: () {
                              if (tasbihController.tasbihs[index].count > 0) {
                                tasbihController.decrement(index);

                                /// Vibrate
                                Vibrate.feedback(FeedbackType.medium);
                              }
                            },
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
