"""empty message

Revision ID: 26bdab492041
Revises: 18c534f24a69
Create Date: 2023-06-26 11:35:47.037629

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '26bdab492041'
down_revision = '18c534f24a69'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('post', schema=None) as batch_op:
        batch_op.alter_column('status',
               existing_type=postgresql.ENUM('ACTIVE', 'INACTIVE', name='status'),
               nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('post', schema=None) as batch_op:
        batch_op.alter_column('status',
               existing_type=postgresql.ENUM('ACTIVE', 'INACTIVE', name='status'),
               nullable=True)

    # ### end Alembic commands ###