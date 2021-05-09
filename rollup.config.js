import babel from "rollup-plugin-babel";
import localResolve from "rollup-plugin-node-resolve";
import cleanup from "rollup-plugin-cleanup";

const config = {
  input: `src/index.ts`,
  output: [
    {
      file: "dist/es/abyss.js",
      format: "es",
    },
    {
      file: `dist/cjs/abyss.js`,
      format: "cjs",
    },
  ],
  plugins: [
    localResolve({
      extensions: [".js", ".ts"],
    }),
    babel({
      exclude: "node_modules/**",
      extensions: [".js", ".ts"],
    }),
    cleanup({
      extensions: ["js", "ts"],
      sourcemap: false,
    }),
  ],
};

export default config;
