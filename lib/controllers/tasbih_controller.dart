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
          updatedAt: '1970-01-01 00:00:00',
        ),
        Tasbih(
          name: 'AllahuAkbar',
          count: 107,
          updatedAt: '1970-01-01 00:00:00',
        ),
        Tasbih(
          name: 'MasyaAllah',
          count: 69,
          updatedAt: '1970-01-01 00:00:00',
        ),
        Tasbih(
          name: 'Contoh tasbih',
          count: 41,
          updatedAt: '1970-01-01 00:00:00',
        ),
        Tasbih(
          name: '🕌',
          count: 14,
          updatedAt: '1970-01-01 00:00:00',
        ),
        Tasbih(
          name: 'Mantap Jiwa 🤩',
          count: 77,
          updatedAt: '1970-01-01 00:00:00',
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

    print('[DATABASE] +1');

    /// Update the updatedAt
    updateUpdatedAt(index);
  }

  void decrement(index) {
    var decrement = tasbihs[index];
    decrement.count--;
    tasbihs[index] = decrement;
    print('[DATABASE] -1');

    /// Update the updatedAt
    updateUpdatedAt(index);
  }

  void insert(name) {
    tasbihs.add(Tasbih(name: name));
    print('[DATABASE] inserted $name');
  }

  void remove(index) {
    tasbihs.removeAt(index);
    print('[DATABASE] deleted at index $index');
  }

  void rename(index, newName) {
    var rename = tasbihs[index];
    rename.name = newName;
    tasbihs[index] = rename;
    print('[DATABASE] renamed at index $index');

    /// Note: Does not update the [updatedAt] because [updatedAt] is only updated if the tasbih counter is changed
  }

  void reset(index) {
    var reset = tasbihs[index];
    reset.count = 0;
    tasbihs[index] = reset;
    print('[DATABASE] reset to 0');

    /// Update the updatedAt
    updateUpdatedAt(index);
  }

  void updateUpdatedAt(index) {
    var newUpdatedAt = tasbihs[index];
    newUpdatedAt.updatedAt = DateTime.now().toIso8601String();
    tasbihs[index] = newUpdatedAt;
  }

  bool isExist(name) {
    for (var i = 0; i < tasbihs.length; i++) {
      if (tasbihs[i].name == name) {
        return true;
      }
    }

    return false;
  }
}
