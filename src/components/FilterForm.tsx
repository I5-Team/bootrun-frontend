import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";

type FilterFormProps = {
    label: string,
    queryName: string,
    options: {label: string, value: string}[];
}

type FormQuerys = {
    key: string,
    value: string,
}

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

const FilterForm = ({ filterData }: { filterData: FilterFormProps[] }) => {
    // URL 쿼리 스트링 변경
    const [searchParams, setSearchParams] = useSearchParams();

    // const [selectedOptions, setSelectedOptions] = useState<FormQuerys[]>([]);

    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value, checked} = e.target;
        if (checked) {
            setSearchParams(prev => ({...prev, [name]: value}));
        } else {
            setSearchParams({});
        }
    }

    useEffect(() => {
        console.log(searchParams);
        setSearchParams({});
    }, []);

    // useEffect(() => {
    //     setSearchParams({ category: "frontend"});
    //     console.log(selectedOptions);
    // }, [selectedOptions]);

    return (
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
                                        onChange={(e) => handleCheck(e)}
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
    )
}

export default FilterForm;