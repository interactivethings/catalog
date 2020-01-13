let
  pkgs = import (fetchTarball https://nixos.org/channels/nixpkgs-unstable/nixexprs.tar.xz) { };
  nodejs = pkgs.nodejs-12_x;

in pkgs.mkShell {
  buildInputs = [
    pkgs.darwin.apple_sdk.frameworks.CoreServices
    pkgs.yarn
    nodejs
  ];
}