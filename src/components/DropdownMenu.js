import { StyleSheet } from 'react-native';
import { SelectCountry } from 'react-native-element-dropdown';

const local_data = [
    {
        value: 'a',
        label: 'Country 1',
        image: {
            uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
        },
    },
    {
        value: 'b',
        label: 'Country 2',
        image: {
            uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
        },
    },
    {
        value: 'c',
        label: 'Country 3',
        image: {
            uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
        },
    },
    {
        value: 'd',
        label: 'Country 4',
        image: {
            uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
        },
    },
    {
        value: 'e',
        label: 'Country 5',
        image: {
            uri: 'https://www.vigcenter.com/public/all/images/default-image.jpg',
        },
    },
];

const DropdownMenu = ({ dataArray, onChange, placeholder }) => {

    return (
        <SelectCountry
            style={styles.dropdown}
            selectedTextStyle={styles.selectedTextStyle}
            placeholderStyle={styles.placeholderStyle}
            imageStyle={styles.imageStyle}
            iconStyle={styles.iconStyle}
            maxHeight={200}
            data={dataArray}
            valueField="value"
            labelField="label"
            imageField="image"
            placeholder={placeholder}
            onChange={(option) => {
                onChange(option.value);
            }}
        />
    );
};

const styles = StyleSheet.create({
    dropdown: {
        margin: 16,
        height: 50,
        width: 200,
        backgroundColor: '#EEEEEE',
        borderRadius: 22,
        paddingHorizontal: 8,
    },
    imageStyle: {
        width: 32,
        height: 32,
        borderRadius: 16,
    },
    placeholderStyle: {
        fontSize: 14,
    },
    selectedTextStyle: {
        fontSize: 14,
        marginLeft: 8,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
});

export default DropdownMenu;