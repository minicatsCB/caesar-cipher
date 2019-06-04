# caesar-cipher
![GitHub Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Caesar3.svg/1920px-Caesar3.svg.png)

I implemented the algorithm based on its mathematical expression extracted from [here](https://en.wikipedia.org/wiki/Caesar_cipher).

## Pseudocode
For both encoding and encoding:

```
1. Split the text into words
2. For each word
    1. Split the word into letters
    2. For each letter
        1. Get the index associated to the character
        2. Offset it `offset` positions
        3. Get the character associated to the index
    3. Join resulting letters
3. Join resulting words
```

### Encoding
![equation](https://latex.codecogs.com/svg.latex?{\displaystyle&space;E_{n}(x)=(x&plus;n)\mod&space;{26}.})

At first, I tried to transcribe this expression to JS using the "modulus" operator (extracted code):

```
// Get the index associated to the character *and* offset it `offset` positions
// alphabetByLetters[letter] give us the index associated to the character

.map(letter => ((alphabetByLetters[letter] + offset) % alphabetLength)
```
But, if I used an offset (`n`) greater than the length of the alphabet I got wrong results. Looking for help, I found that what we usually think is the **modulus** operator in Javascript (`%`) is not actually the modulus, but the **remainder** operator, which in mathematics are not the same.

See: https://crypto.stackexchange.com/questions/42059/using-a-caesar-cipher-with-a-key-higher-than-26

See: https://www.khanacademy.org/computing/computer-science/cryptography/modarithmetic/a/modular-addition-and-subtraction

From the second link I applied modular arithmetic to "decompose" the operation to (extracted code):

```
.map(letter => ((alphabetByLetters[letter] % alphabetLength) + (offset % alphabetLength)) % alphabetLength)
// Then, get the character associated to the index
// alphabetByIndices[letter] give us the character associated to the index
.map(index => alphabetByIndices[index])
```


### Decoding
![equation](https://latex.codecogs.com/svg.latex?{\displaystyle&space;D_{n}(x)=(x-n)\mod&space;{26}.})


The same with the decoding operation (extracted code):
```
.map(letter => ((alphabetByLetters[letter] % alphabetLength) - (offset % alphabetLength)) % alphabetLength)
.map(index => index >= 0 ? alphabetByIndices[index] : alphabetByIndices[alphabetLength + index])
```

I "decomposed" the mathematical expression and, because I store the alphabet in an object (so, there are **no negative indices**), I had to take care when the key was greater than the length of the alphabet.

For example, decoding letter A (index 0), with key value of 1, should give Z (index 25). But our modulus operation gives us `-1`, an index which is not present in the alphabet object. So, when getting the charactter associated to the index, we do `alphabetByIndices[alphabetLength + index]` or `alphabetByIndices[26 + (-1)]`, wich gives 25, this is letter Z.
