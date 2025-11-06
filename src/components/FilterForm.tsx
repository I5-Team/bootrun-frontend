import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

import Tag from "../components/Tag";
import Button from "../components/Button";
import SvgReset from "../assets/icons/icon-reset.svg?react";

type FilterFormProps = {
    label: string,
    queryName: string,
    options: {label: string, value: string}[];
}

type QueryParams = {
    [key:string]: string[];
}

type SelectedState = {
    options: QueryParams;
    names: string[];
};

const StyledFilterForm = styled.form`
    width: 100%;
    border-block: 0.2rem solid ${({ theme }) => theme.colors.gray200};
    margin-block: 3.2rem;
    overflow-x: hidden;

    @media ${({ theme }) => theme.devices.tablet} {
        overflow-x: scroll;
    }
`;

const StyledFieldset = styled.fieldset`
    width: 100%;
    padding: 2rem;
    
    display: flex;
    justify-content: start;
    align-items: start;


    &:not(:last-child) {
        border-bottom: 0.1rem solid ${({ theme }) => theme.colors.gray200};
    }

    span {
        font-weight: 700;
        white-space: nowrap;
        width: clamp(8rem, 8vw, 10rem);
    }
`;

const StyledFilterList = styled.ul`
    width: 100%;
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 1.2rem 3.2rem;
    flex-wrap: wrap;

    @media ${({ theme }) => theme.devices.tablet} {
        flex-wrap: nowrap;
    }
`;

const StyledFilterItem = styled.li`
    white-space: nowrap;
    font-weight: 400;
    
    label {
        cursor: pointer;
    }

    span {
        font-weight: 400;
    }

    input[type="checkbox"] {
        display: none;
    }

    input[type="checkbox"]:checked + span {
        font-weight: 700;
        color: ${({ theme }) => theme.colors.primary300};
    }
`;

const StyledTagWrapper = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 2rem;
    margin-bottom: 5.2rem;
`;

const FilterTags = ({ selected, setSelected }: { 
    selected: SelectedState, 
    setSelected: React.Dispatch<React.SetStateAction<SelectedState>>, 
}) => {
    const handleReset = () => {
        setSelected({ options: {}, names: [] });
    };

    const handleDelete = () => {
        // 
    };
    
    return (
        <StyledTagWrapper>
            <Button variant="outline" iconSvg={<SvgReset/>} onClick={handleReset}>
                필터 초기화
            </Button>
            {selected.names.map(tagName => (
                <button key={tagName} onClick={handleDelete}>
                    <Tag variant="dark" hasDelete={true}>{tagName}</Tag>
                </button>
            ))}
            
        </StyledTagWrapper>
    )
};

const FilterForm = ({ filterData }: { filterData: FilterFormProps[] }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isInitialized, setIsInitialized] = useState(false);
    // const [selectedOptions, setSelectedOptions] = useState<QueryParams>({});
    // const [selectedTagNames, setSelectedTagNames] = useState<string[]>([]);
    const [selected, setSelected] = useState<SelectedState>({ options: {}, names: [] });


    useEffect(() => {
        const initialOptions: QueryParams = {};
        const initialNames: string[] = [];

        for (const key of searchParams.keys()) {
            const values = searchParams.getAll(key);
            initialOptions[key] = values;

            values.forEach(value => {
            const field = filterData.find(f => f.queryName === key);
            if (field) {
                const option = field.options.find(o => o.value === value);
                if (option) initialNames.push(option.label);
            }
            });
        }

        setSelected({ options: initialOptions, names: initialNames });
        setIsInitialized(true);
    }, []);

    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value, checked, dataset} = e.target;
        const displayName = dataset.displayName;
        if (!displayName) return;

        setSelected(prev => {
            const currentOptions = prev.options[name] || [];
            const newOptions = checked
                ? [...currentOptions, value]
                : currentOptions.filter(optValue => optValue !== value);

            const newNames = checked
            ? [...prev.names, displayName]
            : prev.names.filter(name => name !== displayName);

            return { options: { ...prev.options, [name]: newOptions }, names: newNames };
            
        })

        // setSelectedOptions(prev => {
        //     const currentOptions = prev[name] || [];
        //     const newOptions = checked
        //         ? [...currentOptions, value]
        //         : currentOptions.filter(optValue => optValue !== value);
        //     return {...prev, [name]: newOptions};
        // })

        // setSelectedTagNames(prev => (
        //     checked
        //     ? [...prev, displayName]
        //     : prev.filter(name => name !== displayName)
        // ))
    }

    // useEffect(() => {
    //     if (!isInitialized) return;

    //     const params = new URLSearchParams();

    //     Object.keys(selectedOptions).forEach(key => {
    //         selectedOptions[key].forEach(value => {
    //             params.append(key, value);
    //         })
    //     })
    //     setSearchParams(params);
    // }, [selectedOptions, isInitialized]);

    useEffect(() => {
        if (!isInitialized) return;

        const params = new URLSearchParams();
        Object.keys(selected.options).forEach(key => {
        selected.options[key].forEach(value => {
            params.append(key, value);
        });
        });
        setSearchParams(params);
    }, [selected, isInitialized, setSearchParams]);

    return (
        <>
            <StyledFilterForm>
                {filterData.map(item => (
                    <StyledFieldset key={item.label}>
                        <legend className="sr-only">{item.label}</legend>
                        <span>{item.label}</span>

                        <StyledFilterList>
                            {item.options.map((option) => (
                                <StyledFilterItem key={option.value}>
                                    <label htmlFor={option.value}>
                                        <input
                                            id={option.value} 
                                            name={item.queryName}
                                            value={option.value}
                                            type="checkbox"
                                            data-display-name={option.label}
                                            onChange={handleCheck}
                                            checked={selected.options[item.queryName]?.includes(option.value) || false}
                                            />
                                        <span>{option.label}</span>
                                    </label>
                                </StyledFilterItem>
                            ))
                            }
                        </StyledFilterList>
                    </StyledFieldset>              
                ))}
            </StyledFilterForm>
            <FilterTags selected={selected} setSelected={setSelected}/>          
    </>
    )
}

export default FilterForm;