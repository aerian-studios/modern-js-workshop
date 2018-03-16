/**
 * This file is to allow us to import polyfill node modules, which won't work untranspiled.
 * This lets webpack load those modules, and then load index.js as usual.
 */
import "isomorphic-unfetch";
import "./index";
