#include <stdio.h>

void decimalParaBinario(int decimal) {
  //Aqui para a função e imprime o 0 no final, fiz desse jeito para imprimir caso o valor escolhido seja 0 e como ele adiciona o 0 depois, ele não mexe no resultado dos outros valores.
  if (decimal == 0) {
    printf("%d", decimal);
  } else {
    decimalParaBinario(decimal / 2);
    printf("%d", decimal % 2);
  }
}

int main() {
  int decimal = 127;
  printf("O número binário correspondente: ");
  decimalParaBinario(decimal);

  return 0;
}
