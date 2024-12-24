import BulletList from "@tiptap/extension-bullet-list";

const CustomBulletList = BulletList.extend({
    addAttributes() {
        return {
            class: {
                default: "disc",
            },
        };
    },
});

export default CustomBulletList;
