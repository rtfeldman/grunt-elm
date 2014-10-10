module TestA where

import TestDependency.Foo

main : Element
main = plainText "This should say 5: " -- ++ (show $ addStuff 2 3)