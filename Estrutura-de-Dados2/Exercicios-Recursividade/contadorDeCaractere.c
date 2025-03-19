#include <stdio.h>


int contarCaractere(char x, char *y) {
  // Se a string está¡ vazia, então o caractere x não pode ser encontrado.
  if (*y == '\0') {
    return 0;
  }

  // Se o caractere atual na string for igual a x, incrementamos o contador em 1.
  // como o ponteiro é igual a posição 0 de um vetor, ele começa verificando a primeira letra da string.
  if (*y == x) {
    return 1 + contarCaractere(x,y + 1);
  } else {
    return contarCaractere(x,y + 1);
  }
}

int main() {

  char str[10] = "joao";
  char caractere = 'o';

  int resultado = contarCaractere(caractere, str);

  printf("O caractere '%c' aparece %d vezes na palavra: %s\n", caractere,
         resultado, str);

  return 0;
}
