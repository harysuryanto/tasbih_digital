import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:tasbih_digital/controllers/tasbih_controller.dart';

class CounterScreen extends StatelessWidget {
  final tasbihController = Get.find<TasbihController>();
  final index = int.parse(Get.parameters['index']!);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).primaryColor,
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
                    color: Colors.white,
                    padding: EdgeInsets.zero,
                    icon: Icon(Icons.arrow_back),
                    onPressed: () {
                      Get.back();
                    },
                  ),
                  SizedBox(height: 8),
                  Text(
                    'Kamu memilih',
                    style: TextStyle(color: Colors.white),
                  ),
                  SizedBox(height: 8),
                  Text(
                    tasbihController.tasbihs[index].name,
                    style: TextStyle(color: Colors.white, fontSize: 30),
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
                  color: Colors.white,
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
                        IconButton(
                          icon: Icon(Icons.restart_alt),
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
                            Feedback.forLongPress(context);

                            /// Show notification
                            Get.snackbar(
                              'Tasbih direset',
                              'Penghitung dikembalikan ke 0',
                              mainButton: TextButton(
                                child: Text(
                                  'Urungkan',
                                  style: TextStyle(color: Colors.black),
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
                                  print('undo the reset');
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
                      ],
                    ),

                    // * Bottom section
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: [
                        IconButton(
                          icon: Icon(Icons.arrow_drop_up),
                          iconSize: 100,
                          autofocus: true,
                          splashColor: Colors.red, // Not working I guest
                          onPressed: () {
                            tasbihController.increment(index);

                            /// Vibrate
                            Feedback.forLongPress(context);
                          },
                        ),
                        IconButton(
                          icon: Icon(Icons.arrow_drop_down),
                          iconSize: 40,
                          onPressed: () {
                            if (tasbihController.tasbihs[index].count > 0) {
                              tasbihController.decrement(index);

                              /// Vibrate
                              Feedback.forLongPress(context);
                            }
                          },
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
