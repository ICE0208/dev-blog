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
  h1: ({ children, id }: { children: React.ReactNode; id?: string }) => (
    <h1
      id={id}
      className="text-3xl font-bold"
    >
      {children}
    </h1>
  ),
  h2: ({ children, id }: { children: React.ReactNode; id?: string }) => (
    <h2
      id={id}
      className="text-2xl font-bold"
    >
      {children}
    </h2>
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
