const generateItemID = () => {
    return Math.random().toString(36).slice(2);
}

test('generateIdTest', () => {
    const id = generateItemID();
    expect(id).toBeTruthy();
})