module TestA exposing (main)

import TestDependency.Foo
import Html exposing (Html, text)

main : Html msg
main = text "This should say 5: " -- ++ (show $ addStuff 2 3)
