import * as runtime from "react/jsx-runtime";
import { Callout } from "./callout";
import ImageWithLoading from "./image-with-loading";

const useMDXComponent = (code: string) => {
  const fn = new Function(code);
  return fn({ ...runtime }).default;
};

const components = {
  Image: ImageWithLoading,
  Callout,
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-3xl font-bold">{children}</h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-2xl font-bold">{children}</h2>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="text-lg">{children}</p>
  ),
};

interface MdxProps {
  code: string;
}

export function MDXConect({ code }: MdxProps) {
  const Component = useMDXComponent(code);
  return <Component components={components} />;
}
