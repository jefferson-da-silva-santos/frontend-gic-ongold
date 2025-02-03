Para criar o CRUD de ITENS com React, usando boas práticas de componentização e seguindo os princípios do SOLID, eu sugeriria uma estrutura modular e reutilizável para os componentes. Vamos focar na organização do código e nos requisitos mencionados, além de garantir que o estado seja gerido adequadamente.

### Estrutura do Projeto

```plaintext
src/
  components/
    ItemList/
      ItemList.js
      ItemListItem.js
    ItemModal/
      ItemModal.js
    ConfirmDialog/
      ConfirmDialog.js
  context/
    ItemContext.js
  services/
    itemService.js
  utils/
    validation.js
  App.js
```

### Componentização

1. **ItemList**: Componente que exibe a lista de itens cadastrados, com possibilidade de edição e exclusão.
    - **ItemListItem**: Subcomponente de cada item da lista, responsável por exibir os campos e ações de editar e excluir.

2. **ItemModal**: Modal para criar ou editar um item. Dependendo da ação (cadastro ou edição), ele terá diferentes permissões, como campos não editáveis e validações específicas.

3. **ConfirmDialog**: Modal para confirmação de ações como excluir ou editar.

4. **ItemContext**: Contexto para gerenciar o estado dos itens de forma global, fazendo o gerenciamento do estado de CRUD centralizado.

### Exemplo de Implementação

#### 1. ItemList.js

```jsx
import React, { useContext } from "react";
import { ItemContext } from "../../context/ItemContext";
import ItemListItem from "./ItemListItem";

const ItemList = () => {
  const { items, deleteItem } = useContext(ItemContext);

  const handleDelete = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este item?")) {
      deleteItem(id);
    }
  };

  return (
    <div>
      <h2>Lista de Itens</h2>
      <table>
        <thead>
          <tr>
            <th>Valor Unitário</th>
            <th>Descrição</th>
            <th>Taxa ICMS Entrada</th>
            <th>Taxa ICMS Saída</th>
            <th>Comissão p/ Vendedor</th>
            <th>NCM</th>
            <th>CST</th>
            <th>CFOP</th>
            <th>EAN</th>
            <th>Total de Custos</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <ItemListItem key={item.id} item={item} onDelete={handleDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemList;
```

#### 2. ItemListItem.js

```jsx
import React from "react";
import { useHistory } from "react-router-dom";

const ItemListItem = ({ item, onDelete }) => {
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/editar/${item.id}`);
  };

  const totalCost = (item) => {
    const { valorUnitario, taxaIcmsEntrada, taxaIcmsSaida, comissaoVendedor } = item;
    return valorUnitario + (valorUnitario * (taxaIcmsEntrada + taxaIcmsSaida + comissaoVendedor) / 100);
  };

  return (
    <tr>
      <td>{item.valorUnitario}</td>
      <td>{item.descricao}</td>
      <td>{item.taxaIcmsEntrada}</td>
      <td>{item.taxaIcmsSaida}</td>
      <td>{item.comissaoVendedor}</td>
      <td>{item.ncm}</td>
      <td>{item.cst}</td>
      <td>{item.cfop}</td>
      <td>{item.ean}</td>
      <td>{totalCost(item).toFixed(2)}</td>
      <td>
        <button onClick={handleEdit}>Editar</button>
        <button onClick={() => onDelete(item.id)}>Excluir</button>
      </td>
    </tr>
  );
};

export default ItemListItem;
```

#### 3. ItemModal.js

```jsx
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ItemContext } from "../../context/ItemContext";

const ItemModal = ({ itemId, isEdit }) => {
  const [item, setItem] = useState({
    valorUnitario: "",
    descricao: "",
    taxaIcmsEntrada: "",
    taxaIcmsSaida: "",
    comissaoVendedor: "",
    ncm: "",
    cst: "",
    cfop: "",
    ean: "",
  });

  const { updateItem, createItem, getItemById } = useContext(ItemContext);
  const history = useHistory();

  useEffect(() => {
    if (isEdit) {
      const currentItem = getItemById(itemId);
      setItem(currentItem);
    }
  }, [isEdit, itemId, getItemById]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      updateItem(item);
    } else {
      createItem(item);
    }
    history.push("/itens");
  };

  return (
    <div>
      <h2>{isEdit ? "Editar Item" : "Cadastrar Item"}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Valor Unitário
          <input type="number" value={item.valorUnitario} required onChange={(e) => setItem({ ...item, valorUnitario: e.target.value })} />
        </label>
        <label>
          Descrição
          <input type="text" value={item.descricao} required onChange={(e) => setItem({ ...item, descricao: e.target.value })} />
        </label>
        <label>
          Taxa ICMS Entrada
          <input type="number" value={item.taxaIcmsEntrada} onChange={(e) => setItem({ ...item, taxaIcmsEntrada: e.target.value })} />
        </label>
        <label>
          Taxa ICMS Saída
          <input type="number" value={item.taxaIcmsSaida} onChange={(e) => setItem({ ...item, taxaIcmsSaida: e.target.value })} />
        </label>
        <label>
          Comissão p/ Vendedor
          <input type="number" value={item.comissaoVendedor} onChange={(e) => setItem({ ...item, comissaoVendedor: e.target.value })} />
        </label>
        <label>
          NCM
          <input type="text" value={item.ncm} disabled />
        </label>
        <label>
          CST
          <input type="text" value={item.cst} disabled />
        </label>
        <label>
          CFOP
          <input type="text" value={item.cfop} disabled />
        </label>
        <label>
          EAN
          <input type="text" value={item.ean} required onChange={(e) => setItem({ ...item, ean: e.target.value })} />
        </label>
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};

export default ItemModal;
```

#### 4. ConfirmDialog.js

```jsx
import React from "react";

const ConfirmDialog = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="confirm-dialog">
      <p>{message}</p>
      <button onClick={onConfirm}>Confirmar</button>
      <button onClick={onCancel}>Cancelar</button>
    </div>
  );
};

export default ConfirmDialog;
```

#### 5. ItemContext.js

```jsx
import React, { createContext, useState } from "react";

export const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  
  const createItem = (item) => {
    setItems([...items, item]);
  };

  const updateItem = (updatedItem) => {
    setItems(items.map(item => (item.id === updatedItem.id ? updatedItem : item)));
  };

  const getItemById = (id) => {
    return items.find(item => item.id === id);
  };

  const deleteItem = (id) => {
    setItems(items.map(item => (item.id === id ? { ...item, excluido: 1 } : item)));
  };

  return (
    <ItemContext.Provider value={{ items, createItem, updateItem, getItemById, deleteItem }}>
      {children}
    </ItemContext.Provider>
  );
};
```

### Boas Práticas Aplicadas

- **Componentização**: A UI foi dividida em componentes reutilizáveis e bem encapsulados.
- **SOLID**: 
  - *Single Responsibility Principle*: Cada componente tem uma responsabilidade única (exibição da lista, modal de cadastro/edição, confirmação).
  - *Open/Closed Principle*: O sistema pode ser estendido (por exemplo, adicionar novos campos ou funcionalidades) sem modificar a implementação atual.
  - *Liskov Substitution Principle*: A manipulação de itens e suas regras podem ser facilmente alteradas sem afetar os outros componentes.
  - *Interface Segregation Principle*: Não há interfaces grandes e pesadas; cada parte do sistema tem um foco específico.
  - *Dependency Inversion Principle*: Os componentes não dependem de implementações específicas, mas de interfaces gerais, como o contexto.

Essa estrutura modular permite facilmente a escalabilidade e manutenção do código.