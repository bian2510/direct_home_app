import React, { useState, useEffect } from 'react';
import { useStateMachine } from 'little-state-machine';
import { useForm, Controller } from 'react-hook-form';
import { Row, Col, Input, InputNumber, Button, Select, Checkbox } from 'antd';
import { cabaLocations } from 'static/data/caba-locations'
import InputIncDec from 'components/UI/InputIncDec/InputIncDec';
import FormControl from 'components/UI/FormControl/FormControl';
import AddListingAction from './AddListingAction';
import { FormHeader, Title, FormContent, FormAction } from './AddListing.style';

const BasicInformation = ({ setStep }) => {
  const { Option } = Select;
  const { action, state } = useStateMachine(AddListingAction);
  const { control, register, errors, setValue, handleSubmit } = useForm();
  const [quantity, setQuantity] = useState({
    guest: 0,
    bed: 0,
  });
  const operations = ['Alquiler', 'Alquiler temporal', 'Vender']
  useEffect(() => {
    register({ name: 'guest' }, { required: true });
    register({ name: 'bed' }, { required: true });
  }, [register]);
  
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  }
  const handleOnChange = (key) => (event) => {
    setQuantity({
      ...quantity,
      [key]: event.target.value,
    });
    setValue([key], event.target.value);
  };

  const handleIncrement = (key) => {
    setQuantity({
      ...quantity,
      [key]: ++quantity[key],
    });
    setValue([key], ++quantity[key]);
  };

  const handleDecrement = (key) => {
    if (quantity[key] <= 0) {
      return false;
    }
    setQuantity({
      ...quantity,
      [key]: --quantity[key],
    });
    setValue([key], --quantity[key]);
  };

  const onSubmit = (data) => {
    action(data);
    setStep(2);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormContent>
        <FormHeader>
          <Title>Agregar Propiedad</Title>
        </FormHeader>
        <h2>Direccion</h2>
        <Row gutter={30}>
          <Col sm={12}>

          <FormControl
              label="Pais"
              htmlFor="country"
              error={errors.country && <span>This field is required!</span>}
            >
            <Select defaultValue="Argentina" style={{ width: 250 }} disabled>
            </Select>
          </FormControl>
          <FormControl
            label="Provincia"
            htmlFor="province"
            error={errors.province && <span>This field is required!</span>}
            >
            <Select defaultValue="CABA" style={{ width: 250 }} disabled>
            </Select>
          </FormControl>
          <FormControl
            label="Localidad"
            htmlFor="locality"
            error={errors.locality && <span>This field is required!</span>}
            >
            <Select defaultValue="Seleccione" style={{ width: 250 }}>
            { cabaLocations.map(location => {
              return <Option value={location}>{location}</Option>
            })}
            </Select>
          </FormControl>
          <FormControl
            label="Operacion"
            htmlFor="operation"
            error={errors.operation && <span>This field is required!</span>}
            >
            <Select defaultValue="Seleccione" style={{ width: 250 }}>
            { operations.map(operation => {
              return <Option value={operation}>{operation}</Option>
            })}
            </Select>
          </FormControl>
          </Col>
          <Col sm={12}>
          <FormControl
              label="Calle"
              htmlFor="stret"
              error={errors.street && <span>This field is required!</span>}
            >
              <Controller
                as={<Input />}
                id="street"
                name="street"
                defaultValue={state.data.street}
                control={control}
                placeholder="Ejemplo: Chaco"
                rules={{
                  required: true,
                }}
                style={{ width: 250 }}
              />
            </FormControl>
            <FormControl
              label="Numero"
              htmlFor="number"
              error={errors.number && <span>This field is required!</span>}
            >
              <Controller
                as={<Input />}
                id="number"
                name="number"
                defaultValue={state.data.number}
                control={control}
                placeholder="Ejemplo: 152"
                rules={{
                  required: true,
                }}
                style={{ width: 250 }}
              />
            </FormControl>
            <FormControl
              label="Piso"
              htmlFor="floor"
              error={errors.floor && <span>This field is required!</span>}
            >
              <Controller
                as={<Input />}
                id="floor"
                name="floor"
                defaultValue={state.data.floor}
                control={control}
                placeholder="Ejemplo: 5"
                rules={{
                  required: true,
                }}
                style={{ width: 250 }}
              />
            </FormControl>
            <FormControl
              label="Precio"
              htmlFor="price"
              error={
                errors.pricePerNight && (
                  <>
                    {errors.pricePerNight?.type === 'required' && (
                      <span>This field is required!</span>
                    )}
                    {errors.pricePerNight?.type === 'pattern' && (
                      <span>Please enter only number!</span>
                    )}
                  </>
                )
              }
            >
              <Controller
                as={<InputNumber />}
                id="price"
                name="price"
                defaultValue={state.data.price}
                control={control}
                placeholder="00.00"
                rules={{
                  required: true,
                  pattern: /^[0-9]*$/,
                }}
                style={{ width: 250 }}
              />
            </FormControl>
          </Col>
        </Row>
        <h2>Caracteristicas</h2>
        <Row gutter={30}>
          <Col sm={12}>
          <FormControl
              label="Ambientes"
              error={errors.guest && <span>This field is required!</span>}
            >
              <InputIncDec
                name="guest"
                value={quantity.guest}
                onChange={handleOnChange('guest')}
                increment={() => handleIncrement('guest')}
                decrement={() => handleDecrement('guest')}
              />
            </FormControl>
            <FormControl
              label="Cuartos"
              error={errors.guest && <span>This field is required!</span>}
            >
              <InputIncDec
                name="guest"
                value={quantity.guest}
                onChange={handleOnChange('guest')}
                increment={() => handleIncrement('guest')}
                decrement={() => handleDecrement('guest')}
              />
            </FormControl>
            <FormControl
              label="Baños"
              error={errors.guest && <span>This field is required!</span>}
            >
              <InputIncDec
                name="guest"
                value={quantity.guest}
                onChange={handleOnChange('guest')}
                increment={() => handleIncrement('guest')}
                decrement={() => handleDecrement('guest')}
              />
            </FormControl>
          </Col>
          <Col sm={12}>
            <FormControl
              label="Living"
              error={errors.guest && <span>This field is required!</span>}
            >
              <InputIncDec
                name="guest"
                value={quantity.guest}
                onChange={handleOnChange('guest')}
                increment={() => handleIncrement('guest')}
                decrement={() => handleDecrement('guest')}
              />
            </FormControl>
            <FormControl
              label="Cocina"
              error={errors.guest && <span>This field is required!</span>}
            >
              <InputIncDec
                name="guest"
                value={quantity.guest}
                onChange={handleOnChange('guest')}
                increment={() => handleIncrement('guest')}
                decrement={() => handleDecrement('guest')}
              />
            </FormControl>
            <FormControl
              label="Area"
              error={errors.guest && <span>This field is required!</span>}
            >
              <InputIncDec
                name="guest"
                value={quantity.guest}
                onChange={handleOnChange('guest')}
                increment={() => handleIncrement('guest')}
                decrement={() => handleDecrement('guest')}
              />
            </FormControl>
          </Col>
        </Row>
        <h2>Amenities</h2>
        <Row gutter={30}>
          <Col sm={12}>
            <Checkbox onChange={onChange}>Mascotas</Checkbox>
            <Checkbox onChange={onChange}>Pileta</Checkbox>
            <Checkbox onChange={onChange}>Niños</Checkbox>
            <Checkbox onChange={onChange}>Laundry</Checkbox>
            <Checkbox onChange={onChange}>BBQ</Checkbox>
            <Checkbox onChange={onChange}>Balcon</Checkbox>
            <Checkbox onChange={onChange}>Portero</Checkbox>
            <Checkbox onChange={onChange}>GYM</Checkbox>
            <Checkbox onChange={onChange}>Parqueadero</Checkbox>
          </Col>
        </Row>
        <FormControl
          label="Descripcion de la propiedad"
          htmlFor="description"
          error={
            errors.hotelDescription && <span>This field is required!</span>
          }
        >
          <Controller
            as={<Input.TextArea rows={5} />}
            id="description"
            name="description"
            defaultValue={state.data.description}
            control={control}
            placeholder="Cuentanos un poco sobre tu propiedad"
            rules={{
              required: true,
            }}
          />
        </FormControl>
      </FormContent>
      <FormAction>
        <div className="inner-wrapper">
          <Button type="primary" htmlType="submit">
            Next
          </Button>
        </div>
      </FormAction>
    </form>
  );
};

export default BasicInformation;
