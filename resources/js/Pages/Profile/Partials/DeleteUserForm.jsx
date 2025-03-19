import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    return (
        <section className={`bg-white rounded-lg shadow-sm p-6 ${className}`}>
            <header>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Eliminar Cuenta
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                    Una vez que se elimine tu cuenta, todos sus recursos y datos se eliminarán permanentemente. Antes de eliminar tu cuenta, descarga cualquier dato o información que desees conservar.
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md mt-4">
                Eliminar Cuenta
            </DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">
                        ¿Estás seguro de que quieres eliminar tu cuenta?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 mb-4">
                        Una vez que se elimine tu cuenta, todos sus recursos y datos se eliminarán permanentemente. Ingresa tu contraseña para confirmar que deseas eliminar permanentemente tu cuenta.
                    </p>

                    <div className="mt-6">
                        <InputLabel htmlFor="password" value="Contraseña" className="sr-only" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 shadow-sm"
                            isFocused
                            placeholder="Contraseña"
                        />

                        <InputError message={errors.password} className="mt-2 text-sm text-red-600" />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
                            Cancelar
                        </SecondaryButton>

                        <DangerButton className="ms-3 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md" disabled={processing}>
                            Eliminar Cuenta
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}