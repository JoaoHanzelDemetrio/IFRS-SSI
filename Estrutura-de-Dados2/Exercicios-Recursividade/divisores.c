#include <stdio.h>
#include <stdlib.h>

int divisores(int num, int aux) {
  if (aux == 0) {
    return 0;
  } else if (num % aux == 0) {
    return 1 + divisores(num, aux - 1);
  } else {
    return divisores(num, aux - 1);
  }
}
main() {
  
  //número testado
  int num = 997;
  printf("%d numeros sao divisores do valor lido", divisores(num, num));
}
