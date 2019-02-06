export default function ({ types: t }: {
    types: any;
}): {
    visitor: {
        JSXElement(path: any, state: any): void;
    };
};
