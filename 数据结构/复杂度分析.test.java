/*
 * @Author: your name
 * @Date: 2020-05-08 18:15:01
 * @LastEditTime: 2020-05-08 18:28:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wheel\数据结构\复杂度分析.test.java
 */


// 全局变量，大小为10的数组array，长度len，下标i。
int array[] = new int[10]; 
int len = 10;
int i = 0;

// 往数组中添加一个元素
void add(int element) {
   if (i >= len) { // 数组空间不够了
     // 重新申请一个2倍大小的数组空间
     int new_array[] = new int[len*2];
     // 把原来array数组中的数据依次copy到new_array
     for (int j = 0; j < len; ++j) {
       new_array[j] = array[j];
     }
     // new_array复制给array，array现在大小就是2倍len了
     array = new_array;
     len = 2 * len;
   }
   // 将element放到下标为i的位置，下标i加一
   array[i] = element;
   ++i;
}
// 首先这是一个插入数组的功能函数，当数组空间不足时(line 18)，会将数组的空间扩充两倍，若充足则直接插入相应字段。
// 最差 O(n) ,最好O(1),均摊分析法O(1)。