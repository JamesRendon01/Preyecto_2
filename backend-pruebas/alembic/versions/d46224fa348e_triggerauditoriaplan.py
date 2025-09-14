"""'TriggerAuditoriaPlan'

Revision ID: d46224fa348e
Revises: e73c59afaa7c
Create Date: 2025-09-14 13:24:29.068623

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'd46224fa348e'
down_revision: Union[str, None] = 'e73c59afaa7c'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Crear triggers de auditoría para la tabla plan."""

    # Trigger INSERT
    op.execute("""
    CREATE TRIGGER trg_auditoria_plan_insert
    AFTER INSERT ON plan
    FOR EACH ROW
    BEGIN
        INSERT INTO auditoria_plan(accion, new_data)
        VALUES (
            'INSERT',
            JSON_OBJECT(
                'id', NEW.id,
                'nombre', NEW.nombre,
                'descripcion', NEW.descripcion,
                'descripcion_corta', NEW.descripcion_corta,
                'costo_persona', NEW.costo_persona,
                'imagen', NEW.imagen,
                'id_ciudad', NEW.id_ciudad,
                'id_informe', NEW.id_informe
            )
        );
    END;
    """)

    # Trigger UPDATE
    op.execute("""
    CREATE TRIGGER trg_auditoria_plan_update
    AFTER UPDATE ON plan
    FOR EACH ROW
    BEGIN
        INSERT INTO auditoria_plan(accion, old_data, new_data)
        VALUES (
            'UPDATE',
            JSON_OBJECT(
                'id', OLD.id,
                'nombre', OLD.nombre,
                'descripcion', OLD.descripcion,
                'descripcion_corta', OLD.descripcion_corta,
                'costo_persona', OLD.costo_persona,
                'imagen', OLD.imagen,
                'id_ciudad', OLD.id_ciudad,
                'id_informe', OLD.id_informe
            ),
            JSON_OBJECT(
                'id', NEW.id,
                'nombre', NEW.nombre,
                'descripcion', NEW.descripcion,
                'descripcion_corta', NEW.descripcion_corta,
                'costo_persona', NEW.costo_persona,
                'imagen', NEW.imagen,
                'id_ciudad', NEW.id_ciudad,
                'id_informe', NEW.id_informe
            )
        );
    END;
    """)

    # Trigger DELETE
    op.execute("""
    CREATE TRIGGER trg_auditoria_plan_delete
    AFTER DELETE ON plan
    FOR EACH ROW
    BEGIN
        INSERT INTO auditoria_plan(accion, old_data)
        VALUES (
            'DELETE',
            JSON_OBJECT(
                'id', OLD.id,
                'nombre', OLD.nombre,
                'descripcion', OLD.descripcion,
                'descripcion_corta', OLD.descripcion_corta,
                'costo_persona', OLD.costo_persona,
                'imagen', OLD.imagen,
                'id_ciudad', OLD.id_ciudad,
                'id_informe', OLD.id_informe
            )
        );
    END;
    """)


def downgrade() -> None:
    """Eliminar triggers de auditoría para la tabla plan."""
    op.execute("DROP TRIGGER IF EXISTS trg_auditoria_plan_insert;")
    op.execute("DROP TRIGGER IF EXISTS trg_auditoria_plan_update;")
    op.execute("DROP TRIGGER IF EXISTS trg_auditoria_plan_delete;")