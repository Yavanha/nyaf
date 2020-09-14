## Global and Local Store

Technically there is just one store. But logically you will usually split the access into a global store (per app or module) and a local one - per component.

![Figure A-11: Global versus local store](assets/globloc.png)

### Merge Strategy

Within a component the stores are being merged and appear as one unit afterwards.
