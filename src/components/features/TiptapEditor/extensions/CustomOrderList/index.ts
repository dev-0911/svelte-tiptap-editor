import OrderedList from "@tiptap/extension-ordered-list";

const CustomOrderedList = OrderedList.extend({
    addAttributes() {
        return {
            class: {
                default: "decimal",
            },
        };
    },
});

export default CustomOrderedList;
