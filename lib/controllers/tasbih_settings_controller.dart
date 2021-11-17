import 'package:get/state_manager.dart';
import 'package:get_storage/get_storage.dart';

class TasbihSettingsController extends GetxController {
  var longVibrateEach33 = false;
  var longVibrateAt100 = false;

  @override
  void onInit() {
    bool? storedLongVibrateEach33 = GetStorage().read('longVibrateEach33');
    bool? storedLongVibrateAt100 = GetStorage().read('longVibrateAt100');

    if (storedLongVibrateEach33 != null) {
      longVibrateEach33 = storedLongVibrateEach33;
    }

    if (storedLongVibrateAt100 != null) {
      longVibrateAt100 = storedLongVibrateAt100;
    }

    super.onInit();
  }

  void toggleLongVibrateEach33() {
    longVibrateEach33 = !longVibrateEach33;

    /// Update the UI
    update();

    /// Save to database
    saveToDatabase('longVibrateEach33', longVibrateEach33);
  }

  void toggleLongVibrateAt100() {
    longVibrateAt100 = !longVibrateAt100;

    /// Update the UI
    update();

    /// Save to database
    saveToDatabase('longVibrateAt100', longVibrateAt100);
  }

  void saveToDatabase(String key, dynamic value) {
    print('Saving $key to database');
    GetStorage().write(key, value);
    print('Value of $key: ${GetStorage().read(key)}');
  }
}
