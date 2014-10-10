module TestB where

import TestDependency.Foo (addStuff)

main : Element
main = plainText "This should say 5: " -- ++ (show $ addStuff 2 3)