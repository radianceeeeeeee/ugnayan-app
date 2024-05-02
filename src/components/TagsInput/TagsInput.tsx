import React, { useEffect, useState } from 'react';
import './TagsInput.css';

const TagsInput = props => {
    const [tags, setTags] = useState(props.tags || []);

    useEffect(() => {
        // Update tags state when props.tags changes
        setTags(props.tags || []);
    }, [props.tags]);

    const removeTags = indexToRemove => {
        setTags(tags.filter((_, index) => index !== indexToRemove));
    };

    const addTags = event => {
        if (event.target.value !== "") {
            setTags([...tags, event.target.value]);
            props.selectedTags([...tags, event.target.value]);
            event.target.value = "";
        }
    };

    return (
        <div className="tags-input tags-input-style">
            <ul id="tags">
                {tags.map((tag, index) => (
                    <li key={index} className="tag tags-input-style">
                        <span className='tag-title tags-input-style'>{tag}</span>
                        <span className='tag-close-icon tags-input-style'
                            onClick={() => removeTags(index)}
                        >
                            x
                        </span>
                    </li>
                ))}
            </ul>
            <input
                type="text"
                onKeyUp={event => event.key === "Enter" ? addTags(event) : null}
                placeholder="Press enter to add tags"
            />
        </div>
    );
};

export default TagsInput;
