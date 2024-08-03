// export function render(query, block) {
//     const root = document.getElementById(query);
//     root.append(block.getContent())
//     return root;
//   }


export function render(query: string, block: { getContent: () => HTMLElement }): HTMLElement | null {
    const root = document.getElementById(query);
    if (!root) {
        console.error(`Element with id ${query} not found`);
        return null;
    }
    root.append(block.getContent());
    return root;
}
