export interface muiColorGroupModel {
    primary: Partial<muiColorModel>;
    secondary: Partial<muiColorModel>;
    error: Partial<muiColorModel>;
    warning: Partial<muiColorModel>;
    success: Partial<muiColorModel>;
    info: Partial<muiColorModel>;
}
export interface muiColorModel {
    main: string;
}

// Custom MUI Color
export const customColor: Partial<muiColorGroupModel> = {
    primary: {
        main: '#0098C2',
    },
    secondary: {
        main: '#e91e63',
    },
};

// Light Theme
export const lightThemeColor: Partial<muiColorGroupModel> = {
    ...(customColor as muiColorGroupModel),
};

// Dark Theme
export const darkThemeColor: Partial<muiColorGroupModel> = {
    ...(customColor as muiColorGroupModel),
};
