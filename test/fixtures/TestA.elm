module TestA where

import TestDependency.Foo
import Graphics.Element exposing (..)
import Text exposing (..)

main : Element
main = show "This should say 5: " -- ++ (show $ addStuff 2 3)