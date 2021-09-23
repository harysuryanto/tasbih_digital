import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import 'package:tasbih_digital/models/tasbih_model.dart';

class TasbihController extends GetxController {
  var tasbihs = [].obs;

  @override
  void onInit() {
    List? storedTasbihs = GetStorage().read<List>('tasbihs');

    if (storedTasbihs != null) {
      tasbihs = storedTasbihs.map((e) => Tasbih.fromJson(e)).toList().obs;
    } else {
      tasbihs.addAll([
        Tasbih(
          name: 'SubhanAllah',
          count: 33,
          updatedAt: DateTime.now().toString(),
        ),
        Tasbih(
          name: 'AllahuAkbar',
          count: 107,
          updatedAt: DateTime.now().toString(),
        ),
        Tasbih(
          name: 'MasyaAllah',
          count: 69,
          updatedAt: DateTime.now().toString(),
        ),
        Tasbih(
          name: 'Contoh tasbih',
          count: 41,
          updatedAt: DateTime.now().toString(),
        ),
        Tasbih(
          name: '🕌',
          count: 14,
          updatedAt: DateTime.now().toString(),
        ),
        Tasbih(
          name: 'Mantap Jiwa 🤩',
          count: 77,
          updatedAt: DateTime.now().toString(),
        ),
      ]);
    }

    ever(tasbihs, (_) {
      GetStorage().write('tasbihs', tasbihs.toList());
      super.onInit();
    });
  }

  void increment(index) {
    var increment = tasbihs[index];
    increment.count++;
    tasbihs[index] = increment;

    print('+1');

    /// Update the updatedAt
    updateUpdatedAt(index);
  }

  void decrement(index) {
    var decrement = tasbihs[index];
    decrement.count--;
    tasbihs[index] = decrement;
    print('-1');

    /// Update the updatedAt
    updateUpdatedAt(index);
  }

  void reset(index) {
    var reset = tasbihs[index];
    reset.count = 0;
    tasbihs[index] = reset;
    print('reset to 0');

    /// Update the updatedAt
    updateUpdatedAt(index);
  }

  void updateUpdatedAt(index) {
    var newUpdatedAt = tasbihs[index];
    newUpdatedAt.updatedAt = DateTime.now().toString();
    tasbihs[index] = newUpdatedAt;
  }
}
