#include <stdio.h>
#include <stdlib.h>
#include <string.h>
int soma(int n) {
  if (n <= 1)
    return n;
  else
    return n + soma(n - 1) ;
}
main() { 
  printf("%d", soma(5));
}
