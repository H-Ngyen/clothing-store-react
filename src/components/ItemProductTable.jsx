import React from 'react';
import { Button } from 'react-bootstrap';

export default function ItemProductTable({ product, onEdit, onDelete }) {
    return (
        <tr key={product.id}>
            <td>{product.id}</td>
            <td>
                <img
                    src={product.image}
                    alt={product.name}
                    width="50"
                    height="50"
                    className="tw-object-cover tw-rounded"
                />
            </td>
            <td>{product.name}</td>
            <td>${product.price}</td>
            <td>{product.category}</td>
            <td className="tw-truncate tw-max-w-xs">{product.description}</td>
            <td>{product.review}</td>
            <td>
                <Button
                    variant="info"
                    size="sm"
                    className="tw-mr-2"
                    onClick={() => onEdit(product)}
                >
                    Edit
                </Button>
                <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onDelete(product.id)}
                >
                    Delete
                </Button>
            </td>
        </tr>
    );
}