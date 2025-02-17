export const useSessionStorage = (key) => {
    const getValue = () => {
        // handling no sessionStorage for Server side
        if (typeof window === 'undefined' || !window.sessionStorage) {
            return null;
        }

        let item = null;
        try {
            const data = window.sessionStorage.getItem(key);
            item = data ? JSON.parse(data) : null;
        } catch (error) {
            item = null;
            console.error(error);
        }
        return item;
    }

    const setValue = (value) => {
        // handling no sessionStorage for Server side
        if (typeof window === 'undefined' || !window.sessionStorage) {
            return false;
        }

        try {
            window.sessionStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    const removeItem = () => {
        // handling no sessionStorage for Server side
        if (typeof window === 'undefined' || !window.sessionStorage) {
            return false;
        }

        try {
            window.sessionStorage.removeItem(key);
            return true;
        } catch {
            return false;
        }
    }

    return [getValue, setValue, removeItem];
}

export const useLocalStorage = (key) => {
    const getValue = () => {
        // handling no localStorage for Server side
        if (typeof window === 'undefined' || !window.localStorage) {
            return null;
        }

        let item = null;
        try {
            const data = window.localStorage.getItem(key);
            item = data ? JSON.parse(data) : null;
        } catch (error) {
            item = null;
            console.error(error);
        }
        return item;
    }

    const setValue = (value) => {
        // handling no localStorage for Server side
        if (typeof window === 'undefined' || !window.localStorage) {
            return null;
        }

        try {
            window.localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    const removeItem = () => {
        // handling no localStorage for Server side
        if (typeof window === 'undefined' || !window.localStorage) {
            return false;
        }

        try {
            window.localStorage.removeItem(key);
            return true;
        } catch {
            return false;
        }
    }

    return [getValue, setValue, removeItem];
}