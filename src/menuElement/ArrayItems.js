import InputComponent from "../constComponent/InputComponent";

const ITEMS = [
    {
        id: '1',
        content: 'Headline'
    },
    {
        id: '2',
        content: 'Copy'
    },
    {
        id: '3',
        content: 'Image'
    },
    {
        id: '4',
        content: 'Slideshow'
    },
    {
        id: '5',
        content: 'Quote'
    },
    {
        id: '6',
        content: 'Campo di input',
        component: (value) => <InputComponent state={value} />
    }
];

export default ITEMS;
