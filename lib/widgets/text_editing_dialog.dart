import 'package:flutter/material.dart';
import 'package:fluttertoast/fluttertoast.dart';
import 'package:get/get_core/src/get_main.dart';
import 'package:get/get_instance/src/extension_instance.dart';
import 'package:get/get_navigation/src/extension_navigation.dart';

import '../controllers/tasbih_controller.dart';

abstract class TextEditingDialog extends StatelessWidget {
  static void showTextEditingDialog({
    required BuildContext context,
    int? indexToEdit,
  }) {
    final tasbihController = Get.find<TasbihController>();

    final textEditingController = TextEditingController();
    final textFieldFocusNode = FocusNode();

    final bool isEditMode = indexToEdit != null ? true : false;

    /// Fill text field with current tasbih name if [isEditMode] is [true]
    textEditingController.text =
        isEditMode ? tasbihController.tasbihs[indexToEdit].name : '';

    final onSubmit = () {
      /// Remove spaces from leading and trailing
      final tasbihName = textEditingController.text.trim();

      /// Tell user to fill the text field if it is is empty
      if (tasbihName.isEmpty) {
        textFieldFocusNode.requestFocus();
        Fluttertoast.showToast(
          msg: 'Nama tidak boleh kosong',
          toastLength: Toast.LENGTH_LONG,
          webPosition: 'center',
          webBgColor: '#000',
          timeInSecForIosWeb: 3,
        );
      } else {
        if (tasbihController.isExist(tasbihName)) {
          textFieldFocusNode.requestFocus();
          Fluttertoast.showToast(
            msg: 'Sudah ada tasbih dengan nama yang sama, gunakan nama lain.',
            toastLength: Toast.LENGTH_LONG,
            webPosition: 'center',
            webBgColor: '#000',
            timeInSecForIosWeb: 3,
          );
        } else {
          if (isEditMode) {
            /// Update the selected data in database
            tasbihController.rename(indexToEdit, tasbihName);
          } else {
            /// Insert data to database
            tasbihController.insert(tasbihName);
          }
          Get.back();
          textEditingController.clear();
        }
      }
    };

    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: Text(
            isEditMode ? 'Ubah nama tasbih' : 'Tambah tasbih',
          ),
          content: TextField(
            controller: textEditingController,
            autofocus: true,
            focusNode: textFieldFocusNode,
            onSubmitted: (value) => onSubmit,
            decoration: InputDecoration(
              labelText: 'Tulis nama tasbih...',
            ),
          ),
          actions: <Widget>[
            TextButton(
              child: Text(
                'Simpan',
              ),
              onPressed: onSubmit,
            ),
          ],
          elevation: 24,
        );
      },
    );
  }
}
