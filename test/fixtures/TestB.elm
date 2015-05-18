module TestB where

import TestDependency.Foo exposing (addStuff)
import Graphics.Element exposing (..)
import Text exposing (..)

main : Element
main = show "This should say 5: " -- ++ (show $ addStuff 2 3)